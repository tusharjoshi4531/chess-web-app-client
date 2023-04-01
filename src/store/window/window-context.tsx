import { createContext } from "react";

interface IWindowContext {
    innerWidth: number,
    innerHeight: number,
}

const WindowContext = createContext<IWindowContext>({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
})

export default WindowContext