import LegacyPage from '../../components/LegacyPage';

export const metadata = {
  title: 'Theegral About'
};

export default function AboutPage() {
  return <LegacyPage bodyFile="about.body.html" cssFile="about.css" scriptFile="about.js" />;
}
