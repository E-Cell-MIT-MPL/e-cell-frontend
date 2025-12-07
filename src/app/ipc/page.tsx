import Hero from '../../components/Hero';
import About from '../../components/About';
import Objectives from '../../components/Objectives';
import Timeline from '../../components/Timeline';
import IPCFooter from '../../components/ipcFooter';

export const metadata = {
    title: 'Innovation Policy Consortium | IPC 2026',
    description:
      'A national-level inter-college policy and research initiative by E-Cell, MIT Manipal.',
  };  

export default function IPCPage() {
  return (
    <>
      <Hero />
      <About />
      <Objectives />
      <Timeline />
      <IPCFooter />
    </>
  );
}
