const diskElem = document.querySelector("[data-disk]")
const DISK_SPEED = 0.4
const JUMP_DURATION = 125
let timeSinceLastJump = Number.POSITIVE_INFINITY

export function setupDisk() {
    setTop(window.innerHeight / 2)
    document.removeEventListener('keydown', handleJump)
    document.addEventListener('keydown', handleJump)
}

export function updateDisk(delta) {
    if (timeSinceLastJump < JUMP_DURATION) {
        setTop(getTop() - DISK_SPEED * delta)
    } else {
        setTop(getTop() + DISK_SPEED * delta)
    }

    timeSinceLastJump += delta
}

export function getDiskRect() {
    return diskElem.getBoundingClientRect()
}

function setTop(top) {
    diskElem.style.setProperty("--disk-top", top)
}

function getTop() {
    return parseFloat(getComputedStyle(diskElem).getPropertyValue("--disk-top"))
}

function handleJump(e) {
    if (e.code !== "Space") return

    timeSinceLastJump = 0
}