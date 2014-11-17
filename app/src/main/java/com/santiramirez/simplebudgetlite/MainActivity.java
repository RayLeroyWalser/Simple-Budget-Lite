package com.santiramirez.simplebudgetlite;

import android.app.Activity;
import android.nfc.Tag;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebStorage;
import android.widget.TextView;
import android.widget.Toast;
import android.webkit.WebSettings;
import android.webkit.WebViewClient;
import android.content.Context;

public class MainActivity extends Activity
{
    private static final String TAG = "MainActivity";
    private final Handler handler = new Handler();
    private WebView WebView;
    private TextView TextView;

    @Override
    protected void onCreate( Bundle savedInstanceState )
    {
        super.onCreate( savedInstanceState );
        setContentView( R.layout.activity_main );

        WebView = ( WebView ) findViewById( R.id.web_view );
        WebSettings settings = WebView.getSettings();

        settings.setJavaScriptEnabled( true );
        settings.setDatabaseEnabled( true );
        String databasePath = this.getApplicationContext().getDir( "database", Context.MODE_PRIVATE ).getPath();
        settings.setDatabasePath(databasePath);

        class AndroidBridge
        {
            public void callAndroid( final String arg )
            {
                handler.post( new Runnable()
                {
                    @Override
                    public void run(){
                        Log.d( TAG, "callAndroid(" + arg + ")" );
                        TextView.setText( arg );
                    }
                });
            }
        }

        WebView.setWebContentsDebuggingEnabled( false );
        WebView.setVerticalScrollBarEnabled( false );
        WebView.addJavascriptInterface( new AndroidBridge(), "android" );
        WebView.getSettings().setJavaScriptEnabled( true );

        WebView.setWebChromeClient( new WebChromeClient()
        {
            public boolean onJsAlert( final WebView view, final String url, final String message, JsResult result )
            {
                Log.d( TAG, "onJsAlert(" + view + ", " + url + ", " + message + ", " + result + ")" );

                Toast.makeText( MainActivity.this, message, Toast.LENGTH_SHORT ).show();
                result.confirm();
                return true;
            }
        });

        settings.setDomStorageEnabled( true );
        WebView.loadUrl( "file:///android_asset/overview.html" );
    }
}
