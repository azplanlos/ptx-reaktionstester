function wairForButton () {
    start = control.millis()
    while (start + 1000 > control.millis()) {
        if (pins.digitalReadPin(DigitalPin.P1) == 0) {
            punkte += 1
            showLEDPoints(punkte)
            music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerUp), music.PlaybackMode.UntilDone)
            if (punkte >= 25) {
                basic.showIcon(IconNames.Yes)
                music._playDefaultBackground(music.builtInPlayableMelody(Melodies.JumpUp), music.PlaybackMode.UntilDone)
                punkte = 0
                basic.clearScreen()
            }
            break;
        }
    }
}
function waitRandomTime () {
    wait = randint(500, 5000)
    start = control.millis()
    while (start + wait > control.millis()) {
        if (pins.digitalReadPin(DigitalPin.P1) == 0) {
            gameOver = 1
            music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerDown), music.PlaybackMode.UntilDone)
            break;
        }
    }
}
function showLEDPoints (points: number) {
    for (let index = 0; index <= points - 1; index++) {
        led.plot(index % 5, index / 5)
    }
}
let gameOver = 0
let wait = 0
let start = 0
let punkte = 0
punkte = 0
showLEDPoints(punkte)
pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
basic.forever(function () {
    pins.digitalWritePin(DigitalPin.P0, 0)
    gameOver = 0
    showLEDPoints(punkte)
    waitRandomTime()
    if (gameOver == 0) {
        pins.digitalWritePin(DigitalPin.P0, 1)
        wairForButton()
    }
})
