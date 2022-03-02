import { updateDisk, setupDisk, getDiskRect } from './disk.js'
import { updatePipes, setupPipes, getPassedPipesCount, getPipeRects } from './pipe.js'

document.addEventListener("keypress", handleStart, { once: true})
const title = document.querySelector("[data-title]")
const subtitle = document.querySelector("[data-subtitle]")

let lastTime
function updateLoop(time) {
    if (lastTime == null) {
        lastTime = time
        window.requestAnimationFrame(updateLoop)
        return
    }
    const delta = time - lastTime
    updateDisk(delta)
    updatePipes(delta)
    if (checkLose()) return handleLose()
    lastTime = time
    window.requestAnimationFrame(updateLoop)
}

function checkLose() {
    const diskRect = getDiskRect()
    const insidePipe = getPipeRects().some(rect => isCollision(diskRect, rect))
    const outsideWorld = diskRect.top < 0 || diskRect.bottom > window.innerHeight
    return outsideWorld || insidePipe
}

function isCollision(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
    )
}

function handleStart() {
    title.classList.add("hide")
    setupDisk()
    setupPipes()
    lastTime = null
    window.requestAnimationFrame(updateLoop)
}

function handleLose() {
    setTimeout(() => {
        title.classList.remove("hide")
        subtitle.classList.remove("hide")
        subtitle.textContent = `${getPassedPipesCount()} Pipes`
        document.addEventListener('keypress', handleStart, { once: true })
    }, 500)
}