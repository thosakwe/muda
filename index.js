class MudaScene extends Phaser.Scene {
  preload() {
    this.load.audio('muda', [
      'assets/muda.mp3',
      'assets/muda.ogg',
    ])
    this.load.audio('za_warudo_audio', [
      'assets/za_warudo.mp3',
      'assets/za_warudo.ogg',
    ]);
    this.load.image('bg', 'assets/background.png');
    this.load.image('dio1', 'assets/dio1.jpg');
    this.load.image('dio2', 'assets/dio2.jpg');
    this.load.image('dio3', 'assets/dio3.jpg');
    this.load.image('dio4', 'assets/dio4.jpg');
    this.load.image('dio5', 'assets/dio5.jpg');
    this.load.image('dio6', 'assets/dio6.jpg');
    this.load.image('dio7', 'assets/dio7.jpg');
    this.load.image('dio8', 'assets/dio8.jpg');
    this.load.image('dio9', 'assets/dio9.jpg');
    this.load.image('dio10', 'assets/dio10.jpg');
    this.load.image('dio11', 'assets/dio11.jpg');
    this.load.image('dio12', 'assets/dio12.jpg');
    this.load.image('dio13', 'assets/dio13.jpg');
    this.load.image('dio14', 'assets/dio14.jpg');
    this.load.image('dio15', 'assets/dio15.jpg');
    this.load.image('dio16', 'assets/dio16.jpg');
    this.load.image('dio17', 'assets/dio17.jpg');
    this.load.image('za_warudo', 'assets/za_warudo.jpg');
    this.load.image('za_warudo2', 'assets/za_warudo2.jpg');
    this.names = [
      'dio1', 'dio2', 'dio3', 'dio4', 'dio5', 'dio6', 'dio7',
      'dio8', 'dio9', 'dio10', 'dio11', 'dio12', 'dio13', 'dio14',
      'dio15', 'dio16', 'dio17',
      'dio1', 'dio2', 'dio3', 'dio4', 'dio5', 'dio6', 'dio7',
      'dio8', 'dio9', 'dio10', 'dio11', 'dio12', 'dio13', 'dio14',
      'dio15', 'dio16', 'dio17',
      'za_warudo', 'za_warudo2'
    ];
  }

  create() {
    this.add.image(0, 0, 'bg').setOrigin(0.2);
    this.za_warudo = this.sound.add('za_warudo_audio');
    this.spawn();
  }

  spawn() {
    const name = Phaser.Utils.Array.GetRandom(this.names);
    const delay = 250;
    let sprite;
    if (name.match(/^za_warudo/)) {
      sprite = this.add.image(this.scale.canvasBounds.centerX, this.scale.canvasBounds.centerY, name).setOrigin(0.5);
    } else {
      const point = this.scale.canvasBounds.getRandomPoint();
      sprite = this.add.image(point.x, point.y, name).setOrigin(0);
    }

    if (name.match(/^za_warudo/)) {
      const text = this.add.text(
        this.scale.canvasBounds.centerX, this.scale.canvasBounds.centerY + sprite.height + 0,
        'TOKI WO TOMARE!!!!!');
      text.setScale(5).setOrigin(0.5, 0);
      this.za_warudo.once('complete', () => {
        this.time.delayedCall(delay, this.spawn.bind(this));
      });
      this.cameras.main.shake(this.za_warudo.duration * 1000);
      this.za_warudo.play();
    } else {
      this.sound.play('muda');
      this.time.delayedCall(delay, this.spawn.bind(this));
    }
  }
}

window.onload = () => {
  const clickMe = document.querySelector('#click-me');
  clickMe.onclick = () => {
    new Phaser.Game({
      parent: 'muda',
      width: window.innerWidth,
      height: window.innerHeight,
      scene: MudaScene
    });
    clickMe.parentElement.remove();
  };
};