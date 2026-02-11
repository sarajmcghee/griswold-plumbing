import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import Container from '../components/Container';

export default function NotFoundPage() {
  return (
    <Container>
      <Card>
        <h1 className="text-3xl font-bold">Page not found</h1>
        <p className="mt-2 text-slate-200">The page you requested does not exist.</p>
        <Button as={Link} to="/" className="mt-4">
          Return home
        </Button>
      </Card>
    </Container>
  );
}
