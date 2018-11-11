void setup() {
  size(280, 2800);
  background(153); 
  byte[] data = loadBytes("rainbow.npy");
  int total = 1000;
  byte[] outdata = new byte[total * 784];
  int outdataIndex = 0;
  for(int n = 0; n < total; n++) {
    int start = 80 + n * 784;
    PImage img = createImage(28, 28 , RGB);
    img.loadPixels();
    for(int i = 0; i < 784; i++) {
       int index = i + start;
       byte val = data[index];
       outdata[outdataIndex] = val;
       outdataIndex++ ;
       img.pixels[i] = color( 255 - val & 0xff);
    }
    img.updatePixels();
    int x = 28 * (n % 10);
    int y = 28 * (n / 10);
    image(img, x, y);
  }
  
  saveBytes("rainbow1000.bin", outdata);
}
