"use strict";
const testing_d_1 = require('angular2/testing.d');
const tech_slider_1 = require('./tech-slider');
testing_d_1.describe('TechSlider Component', () => {
    testing_d_1.beforeEachProviders(() => []);
    testing_d_1.it('should ...', testing_d_1.injectAsync([testing_d_1.TestComponentBuilder], (tcb) => {
        return tcb.createAsync(tech_slider_1.TechSlider).then((fixture) => {
            fixture.detectChanges();
        });
    }));
});

//# sourceMappingURL=../../maps/components/tech-slider/tech-slider.spec.js.map
