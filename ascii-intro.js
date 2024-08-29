/**
 * Animates ASCII art.
 * @param {string} preId - The id of the desired 'pre' tag.
 * @param {string} ascii - The ascii art.
 * @param {number} frameDelay - The time (in ms) between each animation update, more is slower, less is faster.
 */
async function asciiIntro(preId, ascii, frameDelay = 22) {
    function replaceLetter(str, index, replacement) {
        return str.substring(0, index) + replacement + str.substring(index + replacement.length);
    }

    // uncomment if your ascii contains whitespaces
    // let final = ascii.trim().trim()
    document.getElementById(preId).innerText = ""

    let lines = final.split("\n")
    let possible_chars = ["*","-","/","+","=","#"]

    let lengths = []
    for (let i = 0; i < lines.length; i++) {
        lengths.push( Math.floor(Math.random() * 6))
    }

    function displayRange(range) {
        let to_display = ""
        for (let i = 0; i < lines.length; i++) {
            let middle_index = Math.floor(lines[i].length / 2)

            let chars = lines[i].substring(middle_index-range, middle_index+range)

            if (range < (lines[i].length / 2 - 1)) {
                for (let x = 0; x < lengths[i]; x++) {
                    const random_char = Math.floor(Math.random() * possible_chars.length);
                    chars = replaceLetter(chars, x, possible_chars[random_char])
                }
            }

            let range_0 = middle_index - range
            let range_1 = lines[i].length - (middle_index+range)

            to_display += " ".repeat(range_0 < 0 ? 0 : range_0)+chars+" ".repeat(range_1 < 0 ? 0 : range_1)+"\n"
        }
        document.getElementById(preId).innerText = to_display
    }

    for (let x = 0; x <= lines[0].length + 1; x++) {
        displayRange(x)
        await new Promise(res => setTimeout(res, frameDelay))
    }
}