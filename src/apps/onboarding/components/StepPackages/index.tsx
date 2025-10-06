import { Heading } from "@/shared/ui/Heading";
import { useQuery } from "@tanstack/react-query";
import { __ } from "@wordpress/i18n";
import { getSuggerencePackagesQueryOptions } from "@/shared/suggerence-packages/query-options";
import { useThinkingStore } from "../../stores/thinkingStore";
import { useEffect } from "@wordpress/element";
import { Button } from "@wordpress/components";
import { useSelectedPackageStore } from "../../stores/selectedPackageStore";
import { AcceptButton } from "../AcceptButton";
import { autop } from "@wordpress/autop";
import useEmblaCarousel from 'embla-carousel-react'
import './style.css';
import { useSteps } from "../../hooks/useSteps";

export const StepPackages = () => {

    const { data: packages, isLoading: isLoadingPackages } = useQuery(getSuggerencePackagesQueryOptions());

    const { setIsThinking } = useThinkingStore();

    const { selectedPackage, setSelectedPackage } = useSelectedPackageStore();
    const { nextStep } = useSteps();

    useEffect(() => {
        setIsThinking(isLoadingPackages);
    }, [isLoadingPackages]);

    const [emblaRef] = useEmblaCarousel({
        dragFree: true,
        align: 'start',
    })

    const handleSkip = () => {
        setSelectedPackage('');
        nextStep();
    }

    return (
        <div className="grow flex flex-col w-[1080px] max-w-full px-4 gap-4 overflow-y-auto">

            <div className="flex items-start justify-between">
                <div>
                    <Heading>{__('Suggested Site Building Packages', 'suggerence-onboarding')}</Heading>
                    <p className="!text-base !my-0">{__('If you choose a package, your site\'s theme will be automatically switched to the selected package', 'suggerence-onboarding')}</p>
                </div>

                <div className="flex flex-col gap-4 items-end">
                    <AcceptButton disabled={!selectedPackage} />
                    <Button variant="tertiary" onClick={handleSkip}>{__('Skip', 'suggerence-onboarding')}</Button>
                </div>
            </div>

            <div className="flex-1 flex items-center overflow-y-auto min-h-0">
                <div  className="embla">
                    <div className="embla__viewport" ref={emblaRef}>
                        <div className="embla__container">
                            {
                                packages && packages.map((pkg) => (
                                    <div key={pkg.name} className="embla__slide">
                                        <div className={`h-full bg-white p-4 grid grid-cols-1 gap-4 ${selectedPackage !== pkg.name ? 'opacity-75' : ''}`}>
                
                                            <div className="bg-white">
                                                <img src={pkg.image} alt={pkg.name} className="w-full h-[280px] object-cover" />
                                            </div>
                
                                            <div className="flex items-center gap-4">
                                                <img src={pkg.icon} alt={pkg.name} className="w-8 h-8" />
                                                <Heading className="!mb-0" size="sm" as="h3">{pkg.name}</Heading>
                                            </div>
                
                                            <div>
                                                <div className="*:!text-base" dangerouslySetInnerHTML={{ __html: autop(pkg.description) }}></div>
                                            </div>
                
                                            <div>
                                                <Button variant="secondary" onClick={() => setSelectedPackage(pkg.name)}>{__('Choose', 'suggerence-onboarding')}</Button>
                                            </div>
                
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};