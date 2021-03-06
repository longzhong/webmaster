//======================================================================
//        Copyright (C) 2008-2009   
//        All rights reserved
//
//        Filename :ImageOp
//        Description : 
//
//        Created by Conan at  2009-3-6 16:39:35
//        http://conan87810.cnblogs.com      
//======================================================================
using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Drawing.Imaging;
using System.Drawing;
using System.Web;   
using System.Drawing.Drawing2D; 

namespace LONG.Utils
{
  public  static class ZImage
  {

      #region 图片格式转换
      /// <summary>
      /// 图片格式转换
      /// </summary>
      /// <param name="OriFilename">原始文件相对路径</param>
      /// <param name="DesiredFilename">生成目标文件相对路径</param>
      /// <returns></returns>
      ///  JPG采用的是有损压缩所以JPG图像有可能会降低图像清晰度，而像素是不会降低的   
      ///  GIF采用的是无损压缩所以GIF图像是不会降低原图图像清晰度和像素的，但是GIF格式只支持256色图像。
      public static bool ConvertImage(string OriFilename, string DesiredFilename)
      {
          string extname = DesiredFilename.Substring(DesiredFilename.LastIndexOf('.')+1).ToLower();
          ImageFormat DesiredFormat;
          //根据扩张名，指定ImageFormat
          switch (extname)
          {
              case "bmp":
                  DesiredFormat = ImageFormat.Bmp;
                  break;
              case "gif":
                  DesiredFormat = ImageFormat.Gif;
                  break;
              case "jpeg":
                  DesiredFormat = ImageFormat.Jpeg;
                  break;
              case "ico":
                  DesiredFormat = ImageFormat.Icon;
                  break;
              case "png":
                  DesiredFormat = ImageFormat.Png;
                  break;
              default:
                  DesiredFormat = ImageFormat.Jpeg;
                  break;
          }
          try
          {
              System.Drawing.Image imgFile = System.Drawing.Image.FromFile(WebPathTran(OriFilename));
              imgFile.Save(WebPathTran(DesiredFilename), DesiredFormat);
              return true;
          }
          catch 
          {
              return false;
          }
      }
        #endregion


      #region 图片缩放
      /// <summary>
      /// 图片固定大小缩放
      /// </summary>
      /// <param name="OriFileName">源文件相对地址</param>
      /// <param name="DesiredFilename">目标文件相对地址</param>
      /// <param name="IntWidth">目标文件宽</param>
      /// <param name="IntHeight">目标文件高</param>
      /// <param name="imageFormat">图片文件格式</param>
      public static bool ChangeImageSize(string OriFileName, string DesiredFilename, int IntWidth, int IntHeight, ImageFormat imageFormat)
        {
            string SourceFileNameStr =WebPathTran(OriFileName); //来源图片名称路径
            string TransferFileNameStr = WebPathTran(DesiredFilename); //目的图片名称路径
             FileStream myOutput =null;
            try
            {
                System.Drawing.Image.GetThumbnailImageAbort myAbort = new System.Drawing.Image.GetThumbnailImageAbort(imageAbort);
                Image SourceImage = System.Drawing.Image.FromFile(OriFileName);//来源图片定义
                Image TargetImage = SourceImage.GetThumbnailImage(IntWidth, IntHeight, myAbort, IntPtr.Zero);  //目的图片定义
                //将TargetFileNameStr的图片放宽为IntWidth，高为IntHeight 
                myOutput = new FileStream(TransferFileNameStr, FileMode.Create, FileAccess.Write, FileShare.Write);
                TargetImage.Save(myOutput, imageFormat);
                myOutput.Close();
                return true;
            }
            catch 
            {
                myOutput.Close();
                return false;
            }
       
          
        }

      private static  bool imageAbort()
        {
            return false;
        }
      #endregion


      #region 文字水印
      /// <summary>
      /// 文字水印
      /// </summary>
      /// <param name="wtext">文字</param>
      /// <param name="source">图片</param>
      /// <param name="target">保存路径</param>
      /// <param name="alpha">透明度</param>
      /// <param name="fontsize">字体大小</param>
      /// <param name="position">水印位置</param>
      /// <param name="fontcolor">字体颜色</param>
      /// <returns></returns>
      public static bool ImageWaterText(string wtext, string source, string target, double alpha, int fontsize, int position, string fontcolor)
        {
            bool resFlag = false;
            Image image = Image.FromFile(source);  
            Graphics graphics = Graphics.FromImage(image);             
            try
            {
                //获取图片的宽和高   
                int phWidth = image.Width;   
                int phHeight = image.Height;
                //建立一个bitmap，和我们需要加水印的图片一样大小   
                Bitmap bmPhoto = new Bitmap(phWidth, phHeight, PixelFormat.Format24bppRgb);   

                //SetResolution：设置此 Bitmap 的分辨率   
                //这里直接将我们需要添加水印的图片的分辨率赋给了bitmap   
                bmPhoto.SetResolution(image.HorizontalResolution, image.VerticalResolution);    
   
                //设置图形的品质   
                graphics.SmoothingMode = SmoothingMode.AntiAlias;   
   
                //将我们要添加水印的图片按照原始大小描绘（复制）到图形中   
                graphics.DrawImage(
                    image,                                           // 要添加水印的图片   
                    new Rectangle(0, 0, phWidth, phHeight),          // 根据要添加的水印图片的宽和高   
                    0,                                               // X方向从0点开始描绘   
                    0,                                               // Y方向    
                    phWidth,                                         // X方向描绘长度   
                    phHeight,                                        // Y方向描绘长度   
                    GraphicsUnit.Pixel);                             // 描绘的单位，这里用的是像素  
                //字体   
                Font crFont = null;   
                //矩形的宽度和高度，SizeF有三个属性，分别为Height高，width宽，IsEmpty是否为空   
                SizeF crSize = new SizeF();     
                //直到它的长度比图片的宽度小   
                crFont = new Font("arial", fontsize, FontStyle.Bold);   
   
                //测量用指定的 Font 对象绘制并用指定的 StringFormat 对象格式化的指定字符串。   
                crSize = graphics.MeasureString(wtext, crFont);    
   
                //定义在图片上文字的位置   
                float wmHeight =  crSize.Height;   
                float wmWidth = crSize .Width ;   
   
                float  xPosOfWm;   
                float  yPosOfWm; 
                switch (position)   
                {
                    case 8: //底部居中
                        xPosOfWm = phWidth / 2;
                        yPosOfWm = phHeight - wmHeight - 10;
                        break;
                    case 5: //全居中
                        xPosOfWm = phWidth / 2;
                        yPosOfWm = phHeight / 2;
                        break;
                    case 7: //左边底部
                        xPosOfWm = wmWidth;
                        yPosOfWm = phHeight - wmHeight - 10;
                        break;
                    case 1: //左边顶部
                        xPosOfWm = wmWidth/2 ;   
                        yPosOfWm = wmHeight / 2;
                        break;
                    case 3: //右边顶部
                        xPosOfWm = phWidth - wmWidth - 10;
                        yPosOfWm = wmHeight;
                        break;
                    case 9: //右边底部
                        xPosOfWm = phWidth - wmWidth - 10;
                        yPosOfWm = phHeight - wmHeight - 10;
                        break;
                    case 2: //顶部居中
                        xPosOfWm = phWidth / 2;
                        yPosOfWm = wmWidth;
                        break;
                    case 4: //中间居左
                        xPosOfWm = wmWidth;
                        yPosOfWm = phHeight / 2;
                        break;
                    case 6: //中间居右
                        xPosOfWm = phWidth - wmWidth - 10;
                        yPosOfWm = phHeight / 2;
                        break;
                    default:
                        xPosOfWm = wmWidth;
                        yPosOfWm = phHeight - wmHeight - 10;
                        break;  
                } 
   
                //封装文本布局信息（如对齐、文字方向和 Tab 停靠位），显示操作（如省略号插入和国家标准 (National) 数字替换）和 OpenType 功能。   
                StringFormat StrFormat = new StringFormat();   
   
                //定义需要印的文字居中对齐   
                StrFormat.Alignment = StringAlignment.Center;   
   
                //SolidBrush:定义单色画笔。画笔用于填充图形形状，如矩形、椭圆、扇形、多边形和封闭路径。   
   
                //从四个 ARGB 分量（alpha、红色、绿色和蓝色）值创建 Color 结构，这里设置透明度为153   
                //这个画笔为描绘正式文字的笔刷，呈白色   
                int m_alpha = Convert.ToInt32(255 * alpha);
                SolidBrush semiTransBrush = new SolidBrush(Color.FromArgb(m_alpha, System.Drawing.ColorTranslator.FromHtml(fontcolor)));   
   
                //第二次绘制这个图形，建立在第一次描绘的基础上   
                graphics.DrawString(wtext,                 //string of text   
                                   crFont,                                   //font   
                                   semiTransBrush,                           //Brush   
                                   new PointF(xPosOfWm, yPosOfWm),  //Position   
                                   StrFormat);  
                image.Save(target);
                resFlag = true;
            }
            catch (Exception)
            {

                throw;
            }
            finally 
            {
                graphics.Dispose();
                image.Dispose();
              
            }
              return resFlag;
        }


        #endregion

      #region 图片水印

        /// <summary>
        /// 在图片上生成图片水印
        /// </summary>
        /// <param name="Path">原服务器图片路径</param>
        /// <param name="Path_syp">生成的带图片水印的图片路径</param>
        /// <param name="Path_sypf">水印图片路径</param>
      public static bool ImageWaterPic(string source, string target, string waterPicSource, double alpha, int position)
        {
            bool resFlag = false;
            Image sourceimage = Image.FromFile(source);
            Graphics sourcegraphics = Graphics.FromImage(sourceimage);
            Image waterPicSourceImage = Image.FromFile(waterPicSource);
            try
            {
                // 确定其长宽
                int phWidth = sourceimage.Width;
                int phHeight = sourceimage.Height;
                // 封装 GDI+ 位图，此位图由图形图像及其属性的像素数据组成。  
                Bitmap bmPhoto = new Bitmap(phWidth, phHeight, PixelFormat.Format24bppRgb);
                // 设定分辨率    
                bmPhoto.SetResolution(sourceimage.HorizontalResolution, sourceimage.VerticalResolution);
                // 定义一个绘图画面用来装载位图  
                Graphics grPhoto = Graphics.FromImage(bmPhoto); 
                //同样，由于水印是图片，我们也需要定义一个Image来装载它 
                Image imgWatermark = new Bitmap(waterPicSource);
                // 获取水印图片的高度和宽度   
                int wmWidth = imgWatermark.Width;
                int wmHeight = imgWatermark.Height;
                //SmoothingMode：指定是否将平滑处理（消除锯齿）应用于直线、曲线和已填充区域的边缘。   
                // 成员名称   说明    
                // AntiAlias      指定消除锯齿的呈现。     
                // Default        指定不消除锯齿。     
                // HighQuality  指定高质量、低速度呈现。     
                // HighSpeed   指定高速度、低质量呈现。     
                // Invalid        指定一个无效模式。     
                // None          指定不消除锯齿。    
                grPhoto.SmoothingMode = SmoothingMode.AntiAlias;
                // 第一次描绘，将我们的底图描绘在绘图画面上   
                grPhoto.DrawImage(sourceimage,
                                            new Rectangle(0, 0, phWidth, phHeight),
                                            0,
                                            0,
                                            phWidth,
                                            phHeight,
                                            GraphicsUnit.Pixel);
                // 与底图一样，我们需要一个位图来装载水印图片。并设定其分辨率  
                Bitmap bmWatermark = new Bitmap(bmPhoto);
                bmWatermark.SetResolution(sourceimage.HorizontalResolution, sourceimage.VerticalResolution);
                // 继续，将水印图片装载到一个绘图画面grWatermark   
                //   
                //Graphics grWatermark = Graphics.FromImage(bmWatermark);

                //   
                //ImageAttributes 对象包含有关在呈现时如何操作位图和图元文件颜色的信息。   
                //          
                ImageAttributes imageAttributes = new ImageAttributes();

                //   
                //Colormap: 定义转换颜色的映射   
                //   
                ColorMap colorMap = new ColorMap();

                //   
                //我的水印图被定义成拥有绿色背景色的图片被替换成透明   
                //   
                colorMap.OldColor = Color.FromArgb(255, 0, 255, 0);
                colorMap.NewColor = Color.FromArgb(0, 0, 0, 0);

                ColorMap[] remapTable = { colorMap };

                imageAttributes.SetRemapTable(remapTable, ColorAdjustType.Bitmap);

                float[][] colorMatrixElements = {    
                    new float[] {1.0f,  0.0f,  0.0f,  0.0f, 0.0f}, // red红色   
                    new float[] {0.0f,  1.0f,  0.0f,  0.0f, 0.0f}, //green绿色   
                    new float[] {0.0f,  0.0f,  1.0f,  0.0f, 0.0f}, //blue蓝色          
                    new float[] {0.0f,  0.0f,  0.0f,  (float)alpha, 0.0f}, //透明度        
                    new float[] {0.0f,  0.0f,  0.0f,  0.0f, 1.0f}};//   

                //  ColorMatrix:定义包含 RGBA 空间坐标的 5 x 5 矩阵。   
                //  ImageAttributes 类的若干方法通过使用颜色矩阵调整图像颜色。   
                ColorMatrix wmColorMatrix = new ColorMatrix(colorMatrixElements);


                imageAttributes.SetColorMatrix(wmColorMatrix, ColorMatrixFlag.Default,
                 ColorAdjustType.Bitmap);
                //上面设置完颜色，下面开始设置位置   
                //   
                int xPosOfWm;
                int yPosOfWm;

                switch (position)
                {
                    case 8://底部居中
                        xPosOfWm = (phWidth - wmWidth) / 2;
                        yPosOfWm = phHeight - wmHeight - 10;
                        break;
                    case 5://全居中
                        xPosOfWm = (phWidth - wmWidth) / 2;
                        yPosOfWm = (phHeight - wmHeight) / 2;
                        break;
                    case 7://左边底部
                        xPosOfWm = 10;
                        yPosOfWm = phHeight - wmHeight - 10;
                        break;
                    case 1://左边顶部
                        xPosOfWm = 10;
                        yPosOfWm = 10;
                        break;
                    case 3://右边顶部
                        xPosOfWm = phWidth - wmWidth - 10;
                        yPosOfWm = 10;
                        break;
                    case 9://右边底部
                        xPosOfWm = phWidth - wmWidth - 10;
                        yPosOfWm = phHeight - wmHeight - 10;
                        break;
                    case 2://中间顶部
                        xPosOfWm = (phWidth - wmWidth) / 2;
                        yPosOfWm = 10;
                        break;
                    case 4://左边居中
                        xPosOfWm = 10;
                        yPosOfWm = (phHeight - wmHeight) / 2;
                        break;
                    case 6://右边居中
                        xPosOfWm = phWidth - wmWidth - 10;
                        yPosOfWm = (phHeight - wmHeight) / 2;
                        break;
                    default:
                        xPosOfWm = 10;
                        yPosOfWm = phHeight - wmHeight - 10;
                        break;
                }

                //   
                // 第二次绘图，把水印印上去   
                //   
                sourcegraphics.DrawImage(imgWatermark,
                 new Rectangle(xPosOfWm,
                                     yPosOfWm,
                                     wmWidth,
                                     wmHeight),
                                     0,
                                     0,
                                     wmWidth,
                                     wmHeight,
                                     GraphicsUnit.Pixel,
                                     imageAttributes);
                grPhoto.Dispose();
                sourcegraphics.Dispose(); 

                //sourcegraphics.DrawImage(waterPicSourceImage, new System.Drawing.Rectangle(sourceimage.Width - waterPicSourceImage.Width, sourceimage.Height - waterPicSourceImage.Height, waterPicSourceImage.Width, waterPicSourceImage.Height), 0, 0, waterPicSourceImage.Width, waterPicSourceImage.Height, GraphicsUnit.Pixel);
                sourceimage.Save(target);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                sourcegraphics.Dispose();
                sourceimage.Dispose();
                waterPicSourceImage.Dispose();
            }
            return resFlag;
            
        }

        #endregion


      /// <summary>
      /// 路径转换（转换成绝对路径）
      /// </summary>
      /// <param name="path"></param>
      /// <returns></returns>
      private static string WebPathTran(string path)
      {
          try
          {
              return HttpContext.Current.Server.MapPath(path);
          }
          catch
          {
              return path;
          }
      }
    }
}
