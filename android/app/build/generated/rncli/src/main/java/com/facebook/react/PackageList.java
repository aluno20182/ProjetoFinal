
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

import com.projetofinal.BuildConfig;
import com.projetofinal.R;

// amazon-cognito-identity-js
import com.amazonaws.RNAWSCognitoPackage;
// react-native-android-open-settings
import com.levelasquez.androidopensettings.AndroidOpenSettingsPackage;
// react-native-android-wifi
import com.devstepbcn.wifi.AndroidWifiPackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
// react-native-screens
import com.swmansion.rnscreens.RNScreensPackage;
// react-native-wifi-hotspot
import reactnative.hotspot.HotspotPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  private MainPackageConfig mConfig;

  public PackageList(ReactNativeHost reactNativeHost) {
    this(reactNativeHost, null);
  }

  public PackageList(Application application) {
    this(application, null);
  }

  public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
    this.reactNativeHost = reactNativeHost;
    mConfig = config;
  }

  public PackageList(Application application, MainPackageConfig config) {
    this.reactNativeHost = null;
    this.application = application;
    mConfig = config;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(mConfig),
      new RNAWSCognitoPackage(),
      new AndroidOpenSettingsPackage(),
      new AndroidWifiPackage(),
      new RNGestureHandlerPackage(),
      new RNScreensPackage(),
      new HotspotPackage()
    ));
  }
}
