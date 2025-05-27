import VirtualList from "./virtuallist"


export default function VirtualListPage() {
    const list = Array.from({ length: 100 }, (_, i) => `item ${i}`);
    return (
        <div>
            <VirtualList list={list} />
        </div>
    )
}

