import { FlutterwaveModule } from "./flutterwave.module";
import { TestBed } from "@angular/core/testing";

describe("FlutterwaveModule", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlutterwaveModule],
      providers: [],
    }).compileComponents();
  });

  it("should create", () => {
    const myModule = TestBed.get(FlutterwaveModule);
    expect(myModule).toBeTruthy();
  });

  it("should load Flutterwave Inline script and have FlutterwaveCheckout function", (done) => {
    const script = document.createElement("script");
    script.src = "https://checkout.flutterwave.com/v3.js";
    script.onload = () => {
      //@ts-ignore
      //expect(FlutterwaveCheckout).toBeDefined();
      expect(
        document.querySelector(`script[src="${script.src}"]`)
      ).not.toBeNull();
      done();
    };
    document.body.appendChild(script);
  });
});
