`@fluffy-spoon/autofake` will automatically inject fakes for your constructor arguments. Perfect for quick and easy unit testing!

# Example
The following example uses `inverse.js` as IOC container.

```typescript
import Autofaker from '@fluffy-spoon/autofake';

import { Injectable, Inject, Container } from '@fluffy-spoon/inverse';
import InverseProvider from '@fluffy-spoon/autofake-inverse';

const faker = new Autofaker();

const container = new Container();
faker.useInversionOfControlProvider(new InverseProvider(container));


@Injectable
export class Bar {
  say() {
    return 'hello world';
  }
}

@Injectable
export class Foo {
  constructor(@Inject public bar: Bar) {
  }

  doStuff() {
    console.log('says', this.bar.say());
  }
}


faker.registerFakesForConstructorParameterTypesOf(Foo);

const fakeBar = faker.resolveFakeInstance(Bar);
fakeBar.say().returns('foo');

const realFoo = faker.resolveInstance(Foo);
realFoo.doStuff(); //will execute console.log('says', 'foo')
```