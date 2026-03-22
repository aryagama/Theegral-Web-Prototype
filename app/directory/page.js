import LegacyPage from '../../components/LegacyPage';

export const metadata = {
  title: 'Theegral Directory'
};

export default function DirectoryPage() {
  return <LegacyPage bodyFile="directory.body.html" cssFile="directory.css" scriptFile="directory.js" />;
}
