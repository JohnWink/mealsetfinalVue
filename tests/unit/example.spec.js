import { shallowMount } from "@vue/test-utils";

import registration from "@/components/registration.vue";
import login from "@/components/login.vue"

describe("registration.vue", () => {
  it("renders registration", () => {
    //const username = "luis";
    const wrapper = shallowMount(registration);
    expect(wrapper.exists()).toBe(true);
  });

 
});

describe("login.vue", () => {
  it("renders login", () => {
    //const username = "luis";
    const wrapper = shallowMount(login);
    expect(wrapper.exists()).toBe(true);
  });
});
