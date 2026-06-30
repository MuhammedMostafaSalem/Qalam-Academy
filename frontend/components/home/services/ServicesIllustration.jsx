import Image from "next/image"
import services from '@/public/assets/services2.png';

const ServicesIllustration = () => {
    return (
        <div className="relative flex justify-center">
            <Image
                src={services}
                alt="Services"
                width={600}
                height={600}
                priority
                className="w-full max-w-[560px] h-auto"
            />
        </div>
    )
}

export default ServicesIllustration