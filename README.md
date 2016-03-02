author:MakotoInoue

author site:

comment:

問題が起き苦労した点
	
	1.音源ファイルの取得
      パーミッションの設定が他のhtmlやjsファイルと同じだったらNGだったため、777へ変更
	2.audioContext.decodeAudioDataが何度もエラー起こしていたため外側に出した。
    audioContext.decodeAudioDataをaudioHelper.loadAudioBufferの外側へ出し、返り値のarrayBufferが共有できるようにfunctionの外で定義。
    arrayBuffer = _xhr.responseの値を共有できるようになりプレイヤーとしての機能を果たすようになった。
