全然わからず苦労した点
  音源ファイルの取得
    パーミッションの設定が他のhtmlやjsファイルと同じだったらNGだったため、777へ変更
  audioContext.decodeAudioDataが何度もエラー起こしていたため外側に出した。
    audioContext.decodeAudioDataをaudioHelper.loadAudioBufferの外側へ出し、返り値のarrayBufferが共有できるようにfunctionの外で定義。arrayBuffer = _xhr.responseの値を共有できるようになりプレイヤーとしての機能を果たすようになった。