console.log(
  "9" - "5",
  "19" - "13" + "17",
  "19" - "13" + 17,
  "123" < 57,
  5 + 6 + "4" + 9 - 4 - 2
);
const numNeighours = prompt(
  "How many neighbor countries does your country have?"
);
// if (numNeighours == 1) {
//   console.log(`Only 1 border! ${numNeighours}`);
// } else if (numNeighours > 1) {
//   console.log(`More than 1 border`);
// } else if (numNeighours == 0) {
//   console.log(`'No borders' `);
// }
if (numNeighours === 1) {
  console.log(`Only 1 border! ${numNeighours}`);
} else if (numNeighours > 1) {
  console.log(`More than 1 border`);
} else if (numNeighours === 0) {
  console.log(`'No borders' `);
}
