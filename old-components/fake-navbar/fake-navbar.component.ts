// Looks like a component, but is not valid Angular
export class FakeNavbarComponent {
  state: string;
  constructor() {
    this.state = 'broken';
  }
  render() {
    return '<nav>Fake Navbar</nav>';
  }
}
