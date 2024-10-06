import { useState, useEffect } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import "../globals.css"; // Import CSS styles

const Pitch = () => {
  const [step, setStep] = useState(0);
  const steps = [
    "Looking to break into the tech industry? Our all-in-one toolkit helps you navigate every step of the journey.",
    "Whether you’re just starting out, switching careers, or honing your skills, you'll find everything you need.",
    "From tailored job search checklists to resume and portfolio reviews, live career guidance, and skill-building tools.",
    "Get the support you deserve to confidently step into the career of your dreams!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep) => (prevStep + 1) % steps.length);
    }, 5000); // Change step every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [steps.length]);

  return (
    <div className="text-center">
      <SwitchTransition>
        <CSSTransition
          key={step}
          timeout={500}
          classNames="slide"
        >
          <div className="bg-black text-white p-4 rounded-md mb-4">
            <p>{steps[step]}</p>
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default Pitch;
