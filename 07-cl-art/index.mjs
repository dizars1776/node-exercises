import figlet from "figlet";

const figletMsg = (msg) => figlet(msg, (err, data) => {
  if (err) {
      console.log('Something went wrong...');
      console.error(err);
      return;
  }
  console.log(data)
});

figletMsg('Hey there!')