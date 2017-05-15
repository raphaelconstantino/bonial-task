export default class ValidationRuleExecutor {
    
    static ruleRunner (field, name, ...validations)  {
        return (state) => {
            for (let v of validations) {
                let property = field.split('.').reduce((o, i) => o ? o[i] : "", state);
                let errorMessageFunc = v(property, state);
                if (errorMessageFunc) 
                {
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