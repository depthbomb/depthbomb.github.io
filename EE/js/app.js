const _aImages = [
	'../img/mangle/animation.png',
	'../img/monitor/opened.png',
	'../img/monitor/animation.png',
	'../img/backdrop-gf.png',
];
const _aPreloadedImages = [];
const chance = new Chance();
const _eStartButton = document.querySelector('.start');
const _eBackdrop = document.querySelector('.backdrop');
const _eMonitor = document.querySelector('.monitor');
const _eMangle = document.querySelector('.mangle');
const _sAmbience1 = new Howl({ src: ['./audio/ambience.mp3'], loop: true, autoplay: false });
const _sAmbience2 = new Howl({ src: ['./audio/ambience2.mp3'], autoplay: false });
const _sAmbience3 = new Howl({ src: ['./audio/ambience3.mp3'], loop: true, autoplay: false });
const _sEvent = new Howl({ src: ['./audio/event.mp3'], loop: true, autoplay: false });
const _sJumpscare = new Howl({ src: ['./audio/jumpscare.mp3'], loop: false, autoplay: false });
const _iEventAudioDelay = chance.integer({ min: 1, max: 10000 });
const _iJumpscareDelay = chance.integer({ min: (_iEventAudioDelay - 500), max: (_iEventAudioDelay*3.5) });

_eStartButton.addEventListener('click', e => {
	for (let i = 0; i < _aImages.length; i++) {
		_aPreloadedImages[i] = new Image();
		_aPreloadedImages[i].src = _aImages[i];
	}

	_eStartButton.style.display = 'none';
	_eBackdrop.style.display = 'block';
	_sAmbience1.play();

	setTimeout(() => {
		_sEvent.play();
		_eBackdrop.classList.add('gf');
		setTimeout(() => _eBackdrop.classList.remove('gf'), 250);
		_sAmbience3.play();
	}, _iEventAudioDelay);
	
	setTimeout(() => {
		_sAmbience1.stop();
		_sAmbience3.stop();
		_sEvent.stop();
	
		_sJumpscare.play();
		_eMangle.classList.add('bite');
		setTimeout(() => {
			_sJumpscare.stop();
			window.location.href = 'https://i.imgur.com/dKUJIuo.png';
		}, 750);
	}, _iJumpscareDelay);
});