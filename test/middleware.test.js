const lab = require("lab").script();
exports.lab = lab;

let Execute = require("../src/index");

lab.experiment("Middleware Test", () => {

    lab.test("should throw error when type is not defined", (done) => {
        //let execute = new Execute();

        let middleware = {

        };

        try{
            Execute.use(middleware);
        }
        catch(e){
            lab.expect(e.message).to.equal("type is missing in middleware contract");
            done();
        }
    });

    lab.test("should throw error when type is unknown", (done) => {
        //let execute = new Execute();

        let middleware = {
            type: "Something-that-is-notin-the-list"
        };

        try{
            Execute.use(middleware);
        }
        catch(e){
            lab.expect(e.message).to.equal("Unknown middleware type");
            done();
        }
    });

    lab.test("should throw error when type is 'action' and action is not defined", (done) => {
        //let execute = new Execute();

        let middleware = {
            type: "action"
        };

        try{
            Execute.use(middleware);
        }
        catch(e){
            lab.expect(e.message).to.equal("Middleware action is missing");
            done();
        }
    });

    lab.test("should throw error when type is 'action' and name is not defined", (done) => {
        //let execute = new Execute();

        let middleware = {
            type: "action",
            action: ()=>{}
        };

        try{
            Execute.use(middleware);
        }
        catch(e){
            lab.expect(e.message).to.equal("Middleware name is missing");
            done();
        }
    });

    lab.test("should return true when type is 'action' and name and action are defined", (done) => {
        //let execute = new Execute();

        // Clear all actions
        let oldActions = Execute._actions;
        Execute._actions = undefined;

        let middleware1 = {
            type: "action",
            name: "action1",
            action: ()=>{}
        };

        let res1 = Execute.use(middleware1);

        let middleware2 = {
            type: "action",
            name: "action2",
            action: ()=>{}
        };

        let res2 = Execute.use(middleware2);

        lab.expect(res1).to.equal(true);
        lab.expect(res2).to.equal(true);

        Execute._actions = oldActions;

        done();
    });
});