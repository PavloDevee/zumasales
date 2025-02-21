import { Button } from '@/components/ui/button';
import { FaGhost } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-white text-center">
    <h1 className="text-9xl font-bold text-gray-900 tracking-wider whitespace-nowrap mb-4">
      4<span className="inline-block text-blue-600 animate-bounce"><FaGhost /></span>4
    </h1>
    <h2 className="text-4xl text-gray-900 mb-4">Error: 404 page not found</h2>
    <p className="text-gray-700">Sorry, the page you're looking for cannot be accessed</p>
    <Button className='mt-5' onClick={() => navigate('/inspections')}>Back to inspections</Button>
  </main>
  );
};

export default NotFound;
