import Image from "next/image"

interface LandingImageProps {
  width: number
  height: number
  src: string
  alt: string
}

const LandingImage = ({ width, height, src, alt }: LandingImageProps) => {
  return (
    <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={100}
        className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
      />
    </div>
  )
}

export default LandingImage
