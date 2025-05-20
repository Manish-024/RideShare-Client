class Ride {
  constructor(origin, destination, seats) {
    this.origin = origin;
    this.destination = destination;
    this.seats = seats;
  }

  isValid() {
    if (!this.origin || !this.destination || this.seats < 1 || this.seats > 10) {
      return false;
    }
    return true;
  }

  toApiFormat() {
    return {
      action: {
        origin: this.origin,
        destination: this.destination,
        seats: this.seats,
      },
      key: undefined,
    };
  }
}

describe('Object-Oriented Testing for Ride Class', () => {
  test('Valid Ride object', () => {
    const ride = new Ride('A', 'B', 3);
    expect(ride.isValid()).toBe(true);
    expect(ride.toApiFormat()).toEqual({
      action: { origin: 'A', destination: 'B', seats: 3 },
      key: undefined,
    });
  });

  test('Invalid Ride object - missing origin', () => {
    const ride = new Ride('', 'B', 3);
    expect(ride.isValid()).toBe(false);
  });

  test('Invalid Ride object - missing destination', () => {
    const ride = new Ride('A', '', 3);
    expect(ride.isValid()).toBe(false);
  });

  test('Invalid Ride object - seats below minimum', () => {
    const ride = new Ride('A', 'B', 0);
    expect(ride.isValid()).toBe(false);
  });

  test('Invalid Ride object - seats above maximum', () => {
    const ride = new Ride('A', 'B', 11);
    expect(ride.isValid()).toBe(false);
  });
});