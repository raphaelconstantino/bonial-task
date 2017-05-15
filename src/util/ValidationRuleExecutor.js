export default class ValidationRuleExecutor {
    
    static ruleRunner (field, name, ...validations)  {
        return (state) => {
            for (let v of validations) {
                let errorMessageFunc = v(state[field], state);
                if (errorMessageFunc) {
                    return {[field]: errorMessageFunc(name)};
                }
            }
            return null;
        };
    }

    static run (state, runners) {
        return runners.reduce((memo, runner) => {
            return Object.assign(memo, runner(state));
        }, {});
    };
}