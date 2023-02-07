document.addEventListener('plusready', () => {
  if (window.plus) {
    let IntentFilter = plus.android.importClass('android.content.IntentFilter');
    let filter = new IntentFilter();
    filter.addAction('com.android.server.scannerservice.broadcast');
    let receiver = window.plus.android.implements('io.dcloud.feature.internal.reflect.BroadcastReceiver', {
      onReceive: function(context, intent) {
        window.plus.android.importClass(intent);
        let scanCode = intent.getStringExtra('data')
        window.subject.trigger('scanCode', scanCode);
      }
    });
    let main = window.plus.android.runtimeMainActivity();
    main.registerReceiver(receiver, filter);
  }
})
