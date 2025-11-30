let render = (template, data) => {
    for (let key in data) {
        template = template.replaceAll(`{{${key}}}`, data[key]);
    }
    return template;
}
const template = "Hello, {{name}}!";
const data = { name: "Mahmoud" };

console.log(render(template, data))