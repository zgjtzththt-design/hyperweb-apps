package com.example

import android.annotation.SuppressLint
import android.os.Bundle
import android.util.Log
import android.webkit.ConsoleMessage
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.webkit.WebViewAssetLoader
import androidx.webkit.WebViewAssetLoader.AssetsPathHandler
import com.example.ui.theme.MyApplicationTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Immerse completely behind transparent systems bars
        enableEdgeToEdge()
        
        setContent {
            MyApplicationTheme {
                Scaffold(
                    modifier = Modifier.fillMaxSize(),
                    containerColor = Color.Black // Solid deep base background for simulators
                ) { innerPadding ->
                    WebSimulationContent(
                        modifier = Modifier.padding(innerPadding)
                    )
                }
            }
        }
    }
}

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun WebSimulationContent(modifier: Modifier = Modifier) {
    var webViewInstance by remember { mutableStateOf<WebView?>(null) }
    
    // Support Android Back navigation to go backward inside the simulated OS state
    BackHandler(enabled = webViewInstance?.canGoBack() == true) {
        webViewInstance?.goBack()
    }

    Box(
        modifier = modifier.fillMaxSize(),
        contentAlignment = Alignment.BottomEnd
    ) {
        // Native Android web rendering engine container using modern WebViewAssetLoader mapping
        AndroidView(
            modifier = Modifier
                .fillMaxSize()
                .testTag("webview_container"),
            factory = { context ->
                // Create the Asset Loader to bypass CORS policy restrictions for ES modules
                val assetLoader = WebViewAssetLoader.Builder()
                    .setDomain("appassets.androidplatform.net")
                    .addPathHandler("/assets/", AssetsPathHandler(context))
                    .build()

                WebView(context).apply {
                    settings.apply {
                        // Crucial configurations for loading modern JavaScript applications
                        javaScriptEnabled = true
                        domStorageEnabled = true
                        allowFileAccess = true
                        allowContentAccess = true
                        databaseEnabled = true
                        
                        // Relax CORS policies for local files to allow full ES module loading
                        allowFileAccessFromFileURLs = true
                        allowUniversalAccessFromFileURLs = true
                        mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
                        
                        // Adaptive layout scaling parameters
                        loadWithOverviewMode = true
                        useWideViewPort = true
                        
                        // Caching mechanics - load from cache first to guarantee performance
                        cacheMode = WebSettings.LOAD_DEFAULT
                        
                        // Prevent scale limitations
                        builtInZoomControls = false
                        displayZoomControls = false
                        
                        // Set media policies
                        mediaPlaybackRequiresUserGesture = false
                    }
                    
                    // Stay inside the WebView and route requests through the local WebViewAssetLoader
                    webViewClient = object : WebViewClient() {
                        override fun shouldInterceptRequest(
                            view: WebView?,
                            request: WebResourceRequest
                        ): WebResourceResponse? {
                            // Intercept assets offline
                            val response = assetLoader.shouldInterceptRequest(request.url)
                            
                            // FORCE correct MIME Types for critical web assets
                            // (Avoids standard Android MimeTypeMap text/plain module block which results in blank pages)
                            if (response != null) {
                                val path = request.url.path ?: ""
                                when {
                                    path.endsWith(".js", ignoreCase = true) || path.endsWith(".mjs", ignoreCase = true) -> {
                                        response.mimeType = "text/javascript"
                                    }
                                    path.endsWith(".css", ignoreCase = true) -> {
                                        response.mimeType = "text/css"
                                    }
                                    path.endsWith(".json", ignoreCase = true) -> {
                                        response.mimeType = "application/json"
                                    }
                                    path.endsWith(".svg", ignoreCase = true) -> {
                                        response.mimeType = "image/svg+xml"
                                    }
                                    path.endsWith(".html", ignoreCase = true) -> {
                                        response.mimeType = "text/html"
                                    }
                                }
                            }
                            return response
                        }

                        override fun shouldOverrideUrlLoading(
                            view: WebView?,
                            request: WebResourceRequest?
                        ): Boolean {
                            return false // Handle navigation internally
                        }
                    }
                    
                    // Configure Chrome client with console logs redirection for easy styling debugging
                    webChromeClient = object : WebChromeClient() {
                        override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
                            consoleMessage?.let {
                                Log.d("WebViewConsole", "${it.message()} -- Line ${it.lineNumber()} of ${it.sourceId()}")
                            }
                            return super.onConsoleMessage(consoleMessage)
                        }
                    }
                    
                    // Load the virtualized secure context URL (offline)
                    loadUrl("https://appassets.androidplatform.net/assets/www/index.html")
                    
                    webViewInstance = this
                }
            },
            update = {
                // Keep the reference synchronized
                webViewInstance = it
            }
        )

        // Floating button to let the user easily refresh the system simulation
        FloatingActionButton(
            onClick = {
                webViewInstance?.reload()
            },
            modifier = Modifier
                .padding(24.dp)
                .testTag("refresh_simulation_button"),
            containerColor = androidx.compose.material3.MaterialTheme.colorScheme.primaryContainer,
            contentColor = androidx.compose.material3.MaterialTheme.colorScheme.onPrimaryContainer
        ) {
            Icon(
                imageVector = Icons.Default.Refresh,
                contentDescription = "Refresh Simulation"
            )
        }
    }
}
