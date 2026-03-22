import LegacyPage from '../../components/LegacyPage';

export const metadata = {
  title: 'Theegral Works'
};

export default function WorksPage() {
  return <LegacyPage bodyFile="works.body.html" cssFile="works.css" scriptFile="works.js" />;
}
