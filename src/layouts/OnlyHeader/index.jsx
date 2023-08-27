import Header from '@/components/common/Header';
import MatterWrap from '@/components/common/MatterWrap';

function OnlyHeader({ children }) {
    return (
        <div>
            <Header />
            <MatterWrap>
                <div className="m-header">{children}</div>
            </MatterWrap>
        </div>
    );
}

export default OnlyHeader;
