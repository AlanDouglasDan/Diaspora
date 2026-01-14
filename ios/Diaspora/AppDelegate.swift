import Expo
import React
import ReactAppDependencyProvider
//import PushKit
//import WebRTC
//import AVFoundation
//import CallKit

@UIApplicationMain
public class AppDelegate: ExpoAppDelegate {
  var window: UIWindow?

  var reactNativeDelegate: ExpoReactNativeFactoryDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  public override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    let delegate = ReactNativeDelegate()
    let factory = ExpoReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory
    bindReactNativeFactory(factory)

#if os(iOS) || os(tvOS)
    window = UIWindow(frame: UIScreen.main.bounds)
    factory.startReactNative(
      withModuleName: "main",
      in: window,
      launchOptions: launchOptions)
#endif

//    // Setup CallKeep
//    let localizedAppName = Bundle.main.localizedInfoDictionary?["CFBundleDisplayName"] as? String
//    let appName = Bundle.main.infoDictionary?["CFBundleDisplayName"] as! String
//    RNCallKeep.setup([
//      "appName": localizedAppName ?? appName,
//      "supportsVideo": true,
//      "includesCallsInRecents": false,
//    ])
//    
//    // Register for VoIP push notifications
//    RNVoipPushNotificationManager.voipRegistration()

    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }

  // Linking API
  public override func application(
    _ app: UIApplication,
    open url: URL,
    options: [UIApplication.OpenURLOptionsKey: Any] = [:]
  ) -> Bool {
    return super.application(app, open: url, options: options) || RCTLinkingManager.application(app, open: url, options: options)
  }

  // Universal Links
  public override func application(
    _ application: UIApplication,
    continue userActivity: NSUserActivity,
    restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void
  ) -> Bool {
    let result = RCTLinkingManager.application(application, continue: userActivity, restorationHandler: restorationHandler)
    return super.application(application, continue: userActivity, restorationHandler: restorationHandler) || result
  }

  // // MARK: - Audio Session Methods for CXProvider delegate
  // func provider(_ provider: CXProvider, didActivate audioSession: AVAudioSession) {
  //   RTCAudioSession.sharedInstance().audioSessionDidActivate(AVAudioSession.sharedInstance())
  // }

  // func provider(_ provider: CXProvider, didDeactivate audioSession: AVAudioSession) {
  //   RTCAudioSession.sharedInstance().audioSessionDidDeactivate(AVAudioSession.sharedInstance())
  // }

  // // MARK: - PushKit Methods
  // // Handle updated push credentials
  // func pushRegistry(
  //   _ registry: PKPushRegistry,
  //   didUpdate credentials: PKPushCredentials,
  //   for type: PKPushType
  // ) {
  //   RNVoipPushNotificationManager.didUpdate(credentials, forType: type.rawValue)
  // }

  // // Handle incoming pushes
  // func pushRegistry(
  //   _ registry: PKPushRegistry,
  //   didReceiveIncomingPushWith payload: PKPushPayload,
  //   for type: PKPushType,
  //   completion: @escaping () -> Void
  // ) {
  //   // Process the payload
  //   guard
  //     let stream = payload.dictionaryPayload["stream"] as? [String: Any],
  //     let createdCallerName = stream["created_by_display_name"] as? String,
  //     let cid = stream["call_cid"] as? String
  //   else {
  //     completion()
  //     return
  //   }

  //   // Check if user is busy BEFORE registering the call
  //   let shouldReject = StreamVideoReactNative.shouldRejectCallWhenBusy()
  //   let hasAnyActiveCall = StreamVideoReactNative.hasAnyActiveCall()
  //   if shouldReject && hasAnyActiveCall {
  //     // Complete the VoIP notification without showing CallKit UI
  //     completion()
  //     return
  //   }

  //   let uuid = UUID().uuidString
  //   let videoIncluded = stream["video"] as? String
  //   let hasVideo = videoIncluded == "false" ? false : true

  //   StreamVideoReactNative.registerIncomingCall(cid, uuid: uuid)
  //   RNVoipPushNotificationManager.addCompletionHandler(uuid, completionHandler: completion)
  //   RNVoipPushNotificationManager.didReceiveIncomingPush(
  //     with: payload,
  //     forType: type.rawValue
  //   )

  //   // Display the incoming call notification
  //   RNCallKeep.reportNewIncomingCall(
  //     uuid,
  //     handle: createdCallerName,
  //     handleType: "generic",
  //     hasVideo: hasVideo,
  //     localizedCallerName: createdCallerName,
  //     supportsHolding: false,
  //     supportsDTMF: false,
  //     supportsGrouping: false,
  //     supportsUngrouping: false,
  //     fromPushKit: true,
  //     payload: stream,
  //     withCompletionHandler: nil
  //   )
  // }
}

class ReactNativeDelegate: ExpoReactNativeFactoryDelegate {
  // Extension point for config-plugins

  override func sourceURL(for bridge: RCTBridge) -> URL? {
    // needed to return the correct URL for expo-dev-client.
    bridge.bundleURL ?? bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: ".expo/.virtual-metro-entry")
#else
    return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
