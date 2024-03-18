type CodeArr = string[]

type withChangeCodeArgs = {
    prevCodeArr: CodeArr,
    value: string,
    index: number,
    codeListNode: HTMLElement | null | undefined
}

const CODE_LENGTH = 4
export function withChangeCodeArr({prevCodeArr, value, codeListNode, index}: withChangeCodeArgs): CodeArr {
    const codeArr = [...prevCodeArr]
    codeArr[index] = value

    const prevLength = prevCodeArr.join("").length
    const newLength = codeArr.join("").length



    if(prevLength < newLength && index < CODE_LENGTH - 1) {
        const nextInput = codeListNode?.children[index + 1].querySelector("input") as HTMLInputElement
        nextInput.focus()
    }

    if(prevLength > newLength && index != 0) {
        const prevInput = codeListNode?.children[index - 1].querySelector("input") as HTMLInputElement
        prevInput.focus()
    }

    return codeArr
}