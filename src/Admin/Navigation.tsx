import { useNavigate } from 'react-router-dom';
import '@/Designs/EntryPage.css';
const NavigationButtons = () => {
  const navigate = useNavigate();

  const handleNavigateDonor = () => {
    navigate('/donor');
  };

  const handleNavigateAdmin = () => {
    navigate('/admin');
  };

  const handleNavigateOrg = () => {
    navigate('/organization');
  };

  return (
    <div className="entry-page">
      <div
        className="section donor"
        onClick={() => handleNavigateDonor()}
        style={{ backgroundImage: "url('/src/volunteer.jpg')" }}
      >
        <h1>Donor</h1>
      </div>
      <div
        className="section organization"
        onClick={() => handleNavigateOrg()}
        style={{ backgroundImage: "url('/src/charity.png')" }}
      >
        <h1>Organization</h1>
      </div>
      <div
        className="section admin"
        onClick={() => handleNavigateAdmin()}
        style={{ backgroundImage: "url('/src/Admin.jpg')" }}
      >
        <h1>Admin</h1>
      </div>
    </div>
  );
};

export default NavigationButtons;