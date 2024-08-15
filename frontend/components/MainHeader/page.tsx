import Image from "next/image";

export default function MainHeader(){
    return(
        <header className="flex mx-1 border-b-[1px] py-5 px-[15%]">
            <Image
            src="/logo.png"
            alt="Pensadoria logo"
            width={100}
            height={100}
            />
        </header>
    )
}