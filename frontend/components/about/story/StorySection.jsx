import Section from '@/components/sections/Section'
import Container from '@/components/ui/Container'
import StoryImage from './StoryImage'
import StoryContent from './StoryContent'
import Timeline from './Timeline'

const StorySection = () => {
    return (
        <Section className="pt-[80px]">

            <Container>

                <div
                    className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        gap-12
                        lg:grid-cols-[220px_1fr_420px]
                        lg:gap-16
                        items-center
                    "
                >

                    {/* Left */}
                    <div className="order-3 md:order-1">
                        <Timeline />
                    </div>


                    {/* Center */}
                    <div className="order-2 md:order-2">
                        <StoryContent />
                    </div>

                    {/* Right */}
                    <div className="order-1 md:order-3">
                        <StoryImage />
                    </div>

                </div>

            </Container>

        </Section>
    )
}

export default StorySection