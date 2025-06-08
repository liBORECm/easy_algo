import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { BvsBase } from './BVS/BvsBase';
import { MinHeapBase } from './MinHeap/MinHeapBase';
import { MaxHeapBase } from './MaxHeap/MaxHeapBase';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/bvs" element={< BvsBase />} />
        <Route path="/minheap" element={< MinHeapBase />} />
        <Route path="/maxheap" element={< MaxHeapBase />} />
        <Route path="*" element={<>
          <h1>Domovská stránka</h1>
          <Link to="/bvs">/bvs</Link><br/>
          <Link to="/minheap">/minheap</Link><br/>
          <Link to="/maxheap">/maxheap</Link><br/>
          <Link to="/rbtrees">/red black trees</Link><br/>
          <Link to="/b-trees">/b-trees</Link><br/>
        </>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;