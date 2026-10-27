import ScrollVelocity from './ScrollVelocity';
import RevealOnScroll from './RevealOnScroll';

const EmergencyCall = () => {
    return (
        <RevealOnScroll className="overflow-hidden bg-[#07070a]">
            <section
                className="relative bg-[#07070a] border-t border-b border-[rgba(179,18,46,0.5)] py-[32px] overflow-hidden"
                style={{
                    backgroundColor: '#07070a',
                    borderTop: '1px solid rgba(179, 18, 46, 0.5)',
                    borderBottom: '1px solid rgba(179, 18, 46, 0.5)',
                    paddingTop: '32px',
                    paddingBottom: '32px',
                }}
            >
                <ScrollVelocity
                    texts={[
                        'SMOOVE LUXURY TRANSPORTATION',
                        'PREMIUM CHAUFFEURS · TRI-STATE, ATLANTA, MIAMI'
                    ]}
                    velocity={25}
                />
            </section>
        </RevealOnScroll>
    );
};

export default EmergencyCall;
