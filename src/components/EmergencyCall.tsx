import ScrollVelocity from './ScrollVelocity';

const EmergencyCall = () => {
    return (
        <ScrollVelocity
            texts={['88 EXOTIC CAR RENTALS', 'ELITE LUXURY EXPERIENCE • BOSTON • MIAMI • ATLANTA • LA']}
            velocity={80}
            className="text-white font-montserrat"
        />
    );
};

export default EmergencyCall;
