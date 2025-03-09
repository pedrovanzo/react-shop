import data from "./data.json";
import numberArray from "./numberArray.json";
export default function Sandbox() {
  function checkOddOrEven(number: number) {
    return number % 2;
  }
  const defaultArray = data;
  const sorteaz = data.slice();
  sorteaz.sort();
  let sortNumberEven = [];
  let sortNumberOdd = [];
  for (let i = 0; i < numberArray.length; i++) {
    if (checkOddOrEven(parseInt(numberArray[i]) % 2)) {
      sortNumberOdd.push(numberArray[i]);
    } else {
      sortNumberEven.push(numberArray[i]);
    }
  }
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-row divide-x divide-default">
          <ul className="pr-6">
            <li className="">default names</li>
            {defaultArray?.map((item, index) => {
              return <li key={index}>{"index: " + index + " - " + item}</li>;
            })}
          </ul>
          <ul className="pl-6">
            <li className="">crescent a-z</li>
            {sorteaz?.map((item, index) => {
              return <li key={index}>{"index: " + index + " - " + item}</li>;
            })}
          </ul>
        </div>
        <div className="flex flex-row divide-x divide-default">
          <ul className="pr-6">
            <li className="">default numbers</li>
            {numberArray?.map((item, index) => {
              return <li key={index}>{"index: " + index + " - " + item}</li>;
            })}
          </ul>
          <ul className="px-6">
            <li className="">even numbers</li>
            {sortNumberEven?.map((item, index) => {
              return <li key={index}>{"index: " + index + " - " + item}</li>;
            })}
          </ul>
          <ul className="pl-6">
            <li className="">odd numbers</li>
            {sortNumberOdd?.map((item, index) => {
              return <li key={index}>{"index: " + index + " - " + item}</li>;
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
