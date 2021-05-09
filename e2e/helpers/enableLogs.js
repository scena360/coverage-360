export const enableLogs = (page) => {
  page.on('console', msg => {
    for (let i = 0; i < msg.args().length; ++i) console.log(`[page1-${i}]: ${msg.args()[i]}`);
  });
};
