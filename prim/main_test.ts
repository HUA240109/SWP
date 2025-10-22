import { assertEquals } from "@std/assert";
import { isPrime } from "./primzahlen.ts";

Deno.test(function addTest() {
  assertEquals(isPrime(2), true);
});
