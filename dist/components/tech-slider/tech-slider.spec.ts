import {
  it,
  iit,
  describe,
  ddescribe,
  expect,
  inject,
  injectAsync,
  TestComponentBuilder,
  beforeEachProviders
} from 'angular2/testing.d';
import {provide} from 'angular2/core.d';
import {TechSlider} from './tech-slider';


describe('TechSlider Component', () => {

  beforeEachProviders((): any[] => []);


  it('should ...', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    return tcb.createAsync(TechSlider).then((fixture) => {
      fixture.detectChanges();
    });
  }));

});
