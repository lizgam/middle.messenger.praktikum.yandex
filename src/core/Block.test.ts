import Block from './Block';

class myTempBlock extends Block<any> {
    constructor(props: { text: string }) {
        super(props);
    }
    static componentName = "Test";

    getProp() {
        return this.props;
    };

    protected render(): string {
        return `
            <div>Test text: ${this.props.text}</div>
         `;
    }
}

describe('core/Block', () => {
    test('should change props', () => {
        const testBlock = new myTempBlock({ text: "hello" });
        testBlock.setProps({ text: "cool" });

        expect(testBlock.getProp().text).toBe("cool");
    })

})
