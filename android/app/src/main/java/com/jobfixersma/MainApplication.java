package com.jobfixersma;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.RNRSA.RNRSAPackage;
import com.react_native_encryption_library.EncryptionReactPackager;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import cc.rocwang.aescrypto.AesCryptoPackage;
import com.tectiv3.aes.RCTAesPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNRSAPackage(),
            new EncryptionReactPackager(),
            new ReactNativeConfigPackage(),
            new AesCryptoPackage(),
            new RCTAesPackage(),
            new MapsPackage(),
            new VectorIconsPackage(),
            new RNDeviceInfo()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
